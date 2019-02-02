<?php

	class Tracks extends Route
	{
		public static function byId(PDO $pdo, array $inputs): array
		{
			if (!isset($inputs['id']) || !(int) $inputs['id'])
			{
				return self::retParamErr('id');
			}
			$trackSth = $pdo->query('SELECT t.id, t.name, track_no, duration, mp3, album_id, ' . 
				'al.name AS `album_name`, cover_small AS `album_cover_small`, ' .
				'artist_id, ar.name AS `artists_name` ' .
				'FROM tracks t JOIN albums al ON t.album_id = al.id JOIN artists ar ON al.artist_id = ar.id ' .
				'WHERE t.id = ' . (int) $inputs['id']);
			if (!$trackSth)
			{
				return self::retQuerryErr();
			}
			$track = $trackSth->fetch();
			if (!$track)
			{
				return self::retNoRes();
			}
			return self::retArr(200, $track);
		}
	}