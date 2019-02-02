<?php

	class Albums extends Route
	{
		private const LIST_QUERY = "SELECT al.id, al.name, cover_small, FROM_UNIXTIME(release_date, '%Y-%m-%d') AS `release_date`, popularity, COUNT(t.id) AS `tracks_number` " .
									'FROM albums al JOIN tracks t ON al.id = t.album_id ' .
									'GROUP BY t.album_id ';
		private const SINGLE_QUERY = "SELECT al.id, al.name, cover, cover_small, FROM_UNIXTIME(release_date, '%Y-%m-%d') AS `release_date`, popularity FROM albums al WHERE al.id = ";

		public static function main(PDO $pdo, array $inputs): array
		{
			$querStr = self::makeQueryStr($pdo, $inputs);
			if (!$querStr)
			{
				return self::retParamErr();
			}
			$sth = $pdo->query($querStr);
			if (!$sth)
			{
				return self::retQuerryErr();
			}
			$albums = $sth->fetchAll(PDO::FETCH_ASSOC);
			if (!$albums)
			{
				return self::retNoRes();
			}
			if (isset($inputs['id']))
			{
				$albums = $albums[0];
				if (self::addGenres($pdo, $albums))
				{
					return self::retQuerryErr();
				}
			}
			return self::retArr(200, $albums);
		}

		private static function makeQueryStr(PDO $pdo, array $inputs): ?string
		{
			if (isset($inputs['id'])) {
				return ((int) $inputs['id']) ? (self::SINGLE_QUERY . (int) $inputs['id']) : NULL;
			}
			$limitStr = self::handleLimitString($pdo, $inputs);
			return ($limitStr === NULL) ? self::LIST_QUERY . $limitStr : NULL;
		}


		private static function handleLimitString(PDO $pdo, array $inputs): ?string
		{
			if (!isset($inputs['start']) || $inputs['start'] !== 'random')
			{
				return self::makeLimitString($inputs);
			}
			$limit = (int) ($inputs['limit'] ?? 10);
			$start = rand(1, $pdo->query('SELECT COUNT(*) FROM albums')->fetchColumn() - $limit);
			return " LIMIT $start, $limit ";
		}



		/**
		 * @param array[] $album of fetched album (associative)
		 * @return bool of success
		 */
		private static function addGenres(PDO $pdo, array &$album): bool
		{
			$sth = $pdo->query('SELECT id, name FROM genres g JOIN genres_albums ga ON g.id = ga.genre_id WHERE album_id = ' . $album['id']);
			if (!$sth)
			{
				return FALSE;
			}
			$albums['genre'] = $sth->fetchAll(PDO::FETCH_ASSOC);
			return TRUE;
		}
	}



/*
	 Dans les albums récupérés:
		Leurs musiques
		Leur genre
		Le nombre de tracks
		La photo de l’album
		Leur popularité
		Leur année de création


//albums
{
  "id": 3,
  "name": "bla",
  "cover": 'http://some.url/img.png',
  "cover_small": 'http://other.url/img.png',
  "release_date": '1234/12/12',
  "popularity": 75,
  "genre": {
	"id": 6,
	"name": "asdsad"
  },
  "nombre_tracks": 5,
}

*/
