<?php

	class Route
	{

		private function __construct() {}

		protected static function retArr(int $status, $data): array
		{
			return ['status' => $status, 'data' => $data];
		}
	}