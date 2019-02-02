<?php

	class Artists extends Route
	{

		public static function main(PDO $pdo, array $inputs): array
		{
			$queryStr = self::makeQueryStr($inputs);
			if (!$inputs)
			{
				return self::retParamErr();
			}
			$sth = $pdo->query($queryStr);
			if (!$sth)
			{
				return self::retQuerryErr();
			}
			$artists = $sth->fetchAll(PDO::FETCH_ASSOC);
			if (!$artists)
			{
				return self::retNoRes();
			}
			if (isset($inputs['id']))
			{
				$artists = $artists[0];
				if (!self::addAlbums($pdo, $artists))
				{
					return self::retQuerryErr();
				}
			}
			return self::retArr(200, $artists);
		}

		private static function makeQueryStr(array $inputs): ?string
		{
			if (isset($inputs['id'])) {
				return ((int) $inputs['id']) ? ('SELECT * FROM artists WHERE id = ' . (int) $inputs['id']) : NULL;
			}
			$limitStr = self::makeLimitString($inputs);
			return ($limitStr === NULL) ? "SELECT id, name, description, photo FROM artists $limitStr" : NULL;
		}


		/**
		 * @param array $artist of fetched artist (associative)
		 * @return bool of success
		 */
		private static function addAlbums(PDO $pdo, array &$artist): bool
		{
			$sth = $pdo->query('SELECT id, name FROM albums WHERE artist_id = ' . $artist['id']);
			if (!$sth)
			{
				return FALSE;
			}
			$artist['albums'] = $sth->fetch(PDO::FETCH_ASSOC);
			return TRUE;
		}
	}