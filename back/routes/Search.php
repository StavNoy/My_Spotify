<?php

	class Search extends Route
	{
		public static function main(PDO $pdo, array $inputs): array
		{
			$artist = !self::isEmpty($inputs['artist']) ? $inputs['artist'] : FALSE;
			$album = !self::isEmpty($inputs['album']) ? $inputs['album'] : FALSE;
			$genre = (int) ($inputs['genre'] ?? 0);
			if (!self::isEmpty($inputs['track']))
			{
				return self::searchTracks($pdo, $inputs);
			}
			if ($album || ($genre && !$artist))
			{
				return self::searchAlbums($pdo, $album, $artist, $genre);
			}
			if ($artist)
			{
				return self::searchArtist($pdo, $artist, $genre);
			}
			return self::retParamErr();
		}


		private static function isEmpty(&$var): bool
		{
			return empty($var) && $var !== '0';
		}

		private static function searchTracks(PDO $pdo, string $track, $album = FALSE, $artist = FALSE, int $genre = 0): array
		{
			$sttmnt = 'SELECT t.id, t.name, al.id AS `album_id`, al.name AS `album_name`, ar.id AS `artist_id`, ar.name AS `artist_name` FROM tracks t JOIN albums al ON t.album_id = al.id JOIN artists ar ON al.artist_id = ar.id ';
			$where = 'WHERE t.name LIKE ? ';
			$params = ["%$track%"];
			self::handleFields($where, $params, $sttmnt, $genre, $artist, $album);
			return self::prepExecFetch($pdo, ($sttmnt . $where), $params);
		}

		private static function searchAlbums(PDO $pdo, string $album, $artist = FALSE, int $genre = 0): array
		{
			$sttmnt = 'SELECT al.id, al.name, ar.id AS `artist_id`, ar.name AS `artist_name` FROM albums al JOIN artists ar ON al.artist_id = ar.id '
		}

		private static function searchArtist(PDO $pdo, string $artist, int $genre = 0): array
		{

		}

		private static function handleFields(string &$where, array &$params, string &$sttmnt, $genre = 0, $artist = FALSE, $album = FALSE): void
		{
			if ($album !== FALSE)
			{
				$where .= ' AND al.name LIKE ? ';
				$params[] = "%$album%";
			}
			if ($artist !== FALSE)
			{
				$where .= ' AND ar.name LIKE ? ';
				$params[] = "%$artist%";
			}
			if ($genre !== 0)
			{
				$sttmnt .= ' JOIN genres_albums ga ON al.id = ga.album_id ';
				$where .= " AND ga.genre_id = $genre ";
			}
		}

		private static function prepExecFetch(PDO $pdo, string $sttmnt, array $params): array
		{

		}
	}
