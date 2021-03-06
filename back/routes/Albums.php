<?php

	class Albums extends Route
	{
		private const LIST_QUERY = "SELECT al.id, artist_id, al.name, ar.name AS `artist_name`, cover_small, FROM_UNIXTIME(release_date, '%Y-%m-%d') AS `release_date`, popularity, COUNT(t.id) AS `tracks_number` " .
									'FROM albums al JOIN tracks t ON al.id = t.album_id ' .
									'JOIN artists ar ON al.artist_id = ar.id ' .
									'GROUP BY t.album_id ';

		private const SINGLE_QUERY = "SELECT al.id, artist_id, ar.name AS `artist_name`, al.name, cover, cover_small, FROM_UNIXTIME(release_date, '%Y-%m-%d') AS `release_date`, popularity FROM albums al JOIN artists ar ON al.artist_id = ar.id WHERE al.id = ";

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
			$albums = $sth->fetchAll();
			if (!$albums)
			{
				return self::retNoRes();
			}
			if (isset($inputs['id']))
			{
				$albums = $albums[0];
				if (!self::addGenres($pdo, $albums) || !self::addTracks($pdo, $albums))
				{
					return self::retQuerryErr();
				}
			}
			return self::retGood( $albums);
		}

		private static function makeQueryStr(PDO $pdo, array $inputs): ?string
		{
			if (isset($inputs['id'])) {
				return ((int) $inputs['id']) ? (self::SINGLE_QUERY . (int) $inputs['id']) : NULL;
			}
			$queryStr = self::LIST_QUERY;
			if (isset($inputs['artist_id']))
			{
				if (!(int) $inputs['artist_id'])
				{
					return NULL;
				}
				$queryStr .= ' HAVING artist_id = ' . $inputs['artist_id'];
			}
			$limitStr = self::handleLimitString($pdo, $inputs);
			return ($limitStr !== NULL) ? $queryStr . $limitStr : NULL;
		}


		private static function handleLimitString(PDO $pdo, array $inputs): ?string
		{
			if (!isset($inputs['start']) || $inputs['start'] !== 'random')
			{
				return self::makeLimitString($inputs);
			}
			$limit = (int) ($inputs['limit'] ?? 10);
			return " ORDER BY RAND() LIMIT $limit ";
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
			$album['genre'] = $sth->fetchAll();
			return TRUE;
		}

		/**
		 * @param array[] $album of fetched album (associative)
		 * @return bool of success
		 */
		private static function addTracks(PDO $pdo, array &$album): bool
		{
			$sth = $pdo->query('SELECT id, track_no, name, duration, mp3 FROM tracks WHERE album_id = ' . $album['id']);
			if (!$sth)
			{
				return FALSE;
			}
			$album['tracks'] = $sth->fetchAll();
			return TRUE;
		}
	}