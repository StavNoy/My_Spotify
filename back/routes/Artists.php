<?php

	class Artists extends Route
	{

		public static function main(PDO $pdo, array $inputs): array
		{
			$queryStr = self::makeQueryStr($inputs);
			if (!$queryStr)
			{
				return self::retParamErr();
			}
			$sth = $pdo->query($queryStr);
			if (!$sth)
			{
				return self::retQuerryErr();
			}
			$artists = $sth->fetchAll();
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
			return self::retGood($artists);
		}

		private static function makeQueryStr(array $inputs): ?string
		{
			if (isset($inputs['id'])) {
				return ((int) $inputs['id']) ? ('SELECT * FROM artists WHERE id = ' . (int) $inputs['id']) : NULL;
			}
			$limitStr = self::makeLimitString($inputs);
			return ($limitStr !== NULL) ? "SELECT id, name, description, photo FROM artists $limitStr" : NULL;
		}


		/**
		 * @param array $artist of fetched artist (associative)
		 * @return bool of success
		 */
		private static function addAlbums(PDO $pdo, array &$artist): bool
		{
			$sth = $pdo->query("SELECT al.id, artist_id, al.name, cover_small, FROM_UNIXTIME(release_date, '%Y-%m-%d') AS `release_date`, popularity, COUNT(t.id) AS `tracks_number` " .
			'FROM albums al JOIN tracks t ON al.id = t.album_id ' .
			'WHERE artist_id = ' . $artist['id'] . ' ' .
			'GROUP BY t.album_id ');
			if (!$sth)
			{
				return FALSE;
			}
			$artist['albums'] = $sth->fetchAll();
			return TRUE;
		}
	}