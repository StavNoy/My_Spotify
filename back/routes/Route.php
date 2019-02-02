<?php

	/** all passed PDOs are expected to set default to FETCH_ASSOC */
	class Route
	{

		private function __construct() {}

		private static function retArr(int $status, $data): array
		{
			return [$status, $data];
		}

		protected static function retGood($data): array
		{
			return self::retArr(200, $data);
		}

		protected static function retQuerryErr(): array
		{
			return self::retArr(500, 'querry error');
		}

		protected static function retParamErr(string $field = NULL): array
		{
			return self::retArr(422, 'missing or invalid fields' . ($field ? ": $field" : NULL));
		}

		protected static function retNoRes()
		{
			return self::retArr(404, 'no results');
		}

		protected static function makeLimitString(array $inputs): ?string
		{
			$start = (int) ($inputs['start'] ?? 0);
			$limit = (int) ($inputs['limit'] ?? 10);
			if ($start < 0 || $limit <= 0)
			{
				return NULL;
			}
			return " LIMIT $start, $limit ";
		}
	}