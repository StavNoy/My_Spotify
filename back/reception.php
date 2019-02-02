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
		]));
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
			// case ''

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
<<<<<<< HEAD
			$pdo = new PDO('mysql:host=localhost;dbname=my_spotify;charset=utf8mb4', 'morty', 'goto');
			$cleaned = cleanInputs($_GET);
			$response = switchGet($pdo, $cleaned) ?? [404, 'Unknown request'];
=======
			$pdo = new PDO('mysql:host=localhost;dbname=database_music;charset=utf8mb4', 'root', '');
			$cleaned = cleanInputs($_GET);
			$response = switchGet($pdo, $cleaned) ?? [404, 'unknown request'];
>>>>>>> c65c4be7b74d0d5b2f58d05bc680fe43a5c57ed0
			outputJSON(...$response);
		}
		catch (Exception $e){
			outputJSON(500, 'server error');
		}
	}
	else {
		outputJSON(422, 'request not specified');
	}
