<?php

	class Albums extends Route
	{
		public static function getAll(PDO $pdo)
		{
			$sth = $pdo->query('SELECT al.id, al.name, cover, cover_small,release_date, popularity, COUNT(t.id) AS nombre_tracks FROM albums al JOIN tracks t ON al.id = t.album_id GROUP BY t.album_id');
			if (!$sth)
			{
				return self::retQuerryErr();
			}
			$albums = $sth->fetchAll(PDO::FETCH_ASSOC);
			if (self::addGenre($pdo, $albums))
			{
				return self::retQuerryErr();
			}
			return self::retArr(200, $albums);
		}



		private static function addGenre(PDO $pdo, array &$albums): bool
		{
			$sth = $pdo->prepare('SELECT id, name FROM genres g JOIN genres_albums ga ON g.id = ga.genre_id WHERE album_id = ?');
			foreach ($albums as &$album)
			{
				if (!$sth->execute($albums['id']))
				{
					return FALSE;
				}
				$albums['genre'] = $sth->fetchAll(PDO::FETCH_ASSOC);
			}
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
