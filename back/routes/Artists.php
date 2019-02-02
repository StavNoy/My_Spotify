<?php

	class Artists extends Route
	{
		public static function getAll(PDO $pdo): array
		{
			$artSttmnt = $pdo->query('SELECT * FROM artists');
			if (!$artSttmnt)
			{
				return self::retQuerryErr();
			}
			$artists = $artSttmnt->fetchAll(PDO::FETCH_ASSOC);
			if (self::addAlbums($pdo, $artists))
			{
				return self::retQuerryErr();
			}
			return self::retArr(200, $artists);
		}

		public static function byID(PDO $pdo, array $inputs): array
		{
			if (!isset($inputs['id']) || (int) $inputs['id'])
			{
				return self::retParamErr('artist id');
			}
			$sth = $pdo->query('SELECT * from artists WHERE id = ' . (int) $inputs['id']);
			if (!$sth)
			{
				return self::retQuerryErr();
			}
			$toPass = [$sth->fetch(PDO::FETCH_ASSOC)];
			if (self::addAlbums($pdo, $toPass))
			{
				return self::retQuerryErr();
			}
			return self::retArr(200, ...$toPass);
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