<?php

	spl_autoload_register(function ($class_name) {
		require 'routes/' . $class_name . '.php';
	});

	function outputJSON(int $status, $data)
	{
		header('Content-Type: application/json');
		die(json_encode([
			'data' => $data,
			'status' => $status
		], JSON_NUMERIC_CHECK));
	}

	function cleanInputs(array $inputs): array
	{
		$cleaned = [];
		foreach ($inputs as $key => $value) {
			$cleaned[$key] = htmlspecialchars($value);
		}
		return $cleaned;
	}

	function switchGet(PDO $pdo, array $cleaned): ?array
	{
		switch ($cleaned['request'])
		{
			case 'artistes':
				return Artists::main($pdo, $cleaned);
			case 'albums':
				return Albums::main($pdo, $cleaned);
			case 'track':
				return Tracks::byId($pdo, $cleaned);
			case 'search':
				return Search::main($pdo, $cleaned);

			default:
				return NULL;
		}
	}


	/** script entry  *************************************************************************************************************/


	if (isset($_GET['ping']))
	{
		outputJSON(200, 'pong');
	}
	elseif (isset($_GET['request']))
	{
		try
		{
			$pdo = new PDO('mysql:host=localhost;dbname=database_music;charset=utf8mb4', 'root', '', [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
			$cleaned = cleanInputs($_GET);
			$response = switchGet($pdo, $cleaned) ?? [404, 'unknown request'];
			outputJSON(...$response);
		}
		catch (Exception $e){
			outputJSON(500, 'server error');
		}
	}
	else {
		outputJSON(422, 'request not specified');
	}
