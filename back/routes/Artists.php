<?php

	class Artists extends Route
	{
		public static function list(PDO $pdo): array
		{
			$artSttmnt = $pdo->query('SELECT * FROM artists');
			if (!$artSttmnt)
			{
				return self::retArr(500, 'query error');
			}
			$artists = $artSttmnt->fetchAll(PDO::FETCH_ASSOC);
			self::addAlbums($pdo, $artists);
			return self::retArr(200, $artists);
		}

		public static function getOne(PDO $pdo, array $inputs): array
		{
			if (!isset($inputs['id']) || (int) $inputs['id'])
			{
				self::retArr(422, 'missing or invalid fields: artist id');
			}
			$sth = $pdo->query('SELECT * from artists WHERE id = ' . (int) $inputs['id']);
			if (!sth)
			{
				self::retArr(500, 'query error');

			}

		}


		private static function addAlbums(PDO $pdo, array &$artists): void
		{
			$sth = $pdo->prepare('SELECT id, name FROM albums WHERE artist_id = ?');
			foreach ($artists as $artist)
			{
				$sth->execute($artists['id']);
				$artist['albums'] = $sth->fetchAll(PDO::FETCH_ASSOC);
			}
		}
	}


/*
	Trouver les artistes et récupérer:
		• Leur description
		• Leur biographie
		• Leurs albums  // id and name
		• Leurs photos*/