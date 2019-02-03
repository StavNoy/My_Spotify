<?php

	class Genres extends Route
	{
		public static function main(PDO $pdo, array $inputs): array
		{
			$limitStr = self::makeLimitString($inputs);
			if ($limitStr === NULL)
			{
				return self::retParamErr('start and/or limit');
			}
			$sth = $pdo->query('SELECT id, name, COUNT(album_id) AS `albums_number` FROM genres JOIN genres_albums ON genres.id = genres_albums.genre_id GROUP BY genre_id');
			if (!$sth)
			{
				return self::retQuerryErr();
			}
			$genres = $sth->fetchAll();
			if (!$genres)
			{
				return self::retNoRes();
			}
			return self::retGood($genres);
		}
	}