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
			if (!self::addAlbums($pdo, $wrapper_arr))
			{
				return self::retQuerryErr();
			}
			$data = isset($inputs['id']) ? $artists[0] : $artists;
			return self::retArr(200, $data);
		}

		private static function makeQueryStr(array $inputs): ?string
		{
			$queryStr = 'SELECT * FROM artists ';
			if (isset($inputs['id'])) {
				return ((int) $inputs['id']) ? ($queryStr . 'WHERE id = ' . (int) $inputs['id']) : NULL;
			}
			$limitStr = self::makeLimitString($inputs);
			return ($limitStr === NULL) ? $queryStr . $limitStr : NULL;
		}


		/**
		 * @param array[] $artists of fetched artist associative arrays
		 * @return bool of success
		 */
		private static function addAlbums(PDO $pdo, array &$artists): bool
		{
			$sth = $pdo->prepare('SELECT id, name FROM albums WHERE artist_id = ?');
			foreach ($artists as &$artist)
			{
				if (!$sth->execute($artists['id']))
				{
					return FALSE;
				}
				$artist['albums'] = $sth->fetchAll(PDO::FETCH_ASSOC);
			}
			return TRUE;
		}
	}


/*
	Trouver les artistes et récupérer:
		• Leur description
		• Leur biographie
		• Leurs albums  // id and name
		• Leurs photos*/