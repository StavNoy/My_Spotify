<?php

	class Route
	{

		private function __construct() {}

		protected static function retArr(int $status, $data): array
		{
			return ['status' => $status, 'data' => $data];
		}

		protected static function retQuerryErr()
		{
			return self::retArr(500, 'querry error');
		}

		protected static function retParamErr(string $field = NULL)
		{
			return self::retArr(422, 'missing or invalid fields' . ($field ? ": $field" : NULL));
		}
	}