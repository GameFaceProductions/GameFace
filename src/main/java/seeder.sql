-- Adminer 4.7.6 MySQL dump

SET NAMES utf8;
SET
time_zone = '+00:00';
SET
foreign_key_checks = 0;
SET
sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `clips_comments`;
CREATE TABLE `clips_comments`
(
    `id`         int(11) NOT NULL AUTO_INCREMENT,
    `user`       int(11) DEFAULT NULL,
    `clip`       int(11) DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `comment`    text     DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY          `clip` (`clip`),
    KEY          `user` (`user`),
    CONSTRAINT `clips_comments_ibfk_1` FOREIGN KEY (`clip`) REFERENCES `game_clips` (`id`),
    CONSTRAINT `clips_comments_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `clips_likes`;
CREATE TABLE `clips_likes`
(
    `int`   int(11) NOT NULL AUTO_INCREMENT,
    `user`  int(11) DEFAULT NULL,
    `clip`  int(11) DEFAULT NULL,
    `liked` varchar(10) DEFAULT NULL,
    PRIMARY KEY (`int`),
    KEY     `clip` (`clip`),
    KEY     `user` (`user`),
    CONSTRAINT `clips_likes_ibfk_1` FOREIGN KEY (`clip`) REFERENCES `game_clips` (`id`),
    CONSTRAINT `clips_likes_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `friends_list`;
CREATE TABLE `friends_list`
(
    `user`   int(11) NOT NULL,
    `friend` int(11) NOT NULL,
    KEY      `user` (`user`),
    KEY      `friend` (`friend`),
    CONSTRAINT `friends_list_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
    CONSTRAINT `friends_list_ibfk_2` FOREIGN KEY (`friend`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `games`;
CREATE TABLE `games`
(
    `id`   int(10) unsigned NOT NULL AUTO_INCREMENT,
    `game` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `game_clips`;
CREATE TABLE `game_clips`
(
    `id`          int(11) NOT NULL,
    `url`         varchar(100) DEFAULT NULL,
    `media_type`  int(11) DEFAULT NULL,
    `author`      int(11) DEFAULT NULL,
    `likes`       int(10) DEFAULT NULL,
    `uploaded_at` date         DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY           `author` (`author`),
    KEY           `media_type` (`media_type`),
    CONSTRAINT `game_clips_ibfk_1` FOREIGN KEY (`author`) REFERENCES `users` (`id`),
    CONSTRAINT `game_clips_ibfk_2` FOREIGN KEY (`media_type`) REFERENCES `media_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `media_type`;
CREATE TABLE `media_type`
(
    `id`         int(11) NOT NULL AUTO_INCREMENT,
    `media_type` varchar(25) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `platform`;
CREATE TABLE `platform`
(
    `id`       int(11) NOT NULL AUTO_INCREMENT,
    `platform` varchar(25) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`
(
    `id`         int(11) NOT NULL,
    `content`    text     DEFAULT NULL,
    `author`     int(11) DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY          `author` (`author`),
    CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`author`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `posts_comments`;
CREATE TABLE `posts_comments`
(
    `id`         int(11) NOT NULL AUTO_INCREMENT,
    `user`       int(11) DEFAULT NULL,
    `post`       int(11) DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `comment`    text     DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY          `post` (`post`),
    KEY          `user` (`user`),
    CONSTRAINT `posts_comments_ibfk_1` FOREIGN KEY (`post`) REFERENCES `posts` (`id`),
    CONSTRAINT `posts_comments_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `posts_likes`;
CREATE TABLE `posts_likes`
(
    `id`    int(11) NOT NULL AUTO_INCREMENT,
    `user`  int(11) DEFAULT NULL,
    `post`  int(11) DEFAULT NULL,
    `liked` varchar(10) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY     `post` (`post`),
    KEY     `user` (`user`),
    CONSTRAINT `posts_likes_ibfk_1` FOREIGN KEY (`post`) REFERENCES `posts` (`id`),
    CONSTRAINT `posts_likes_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`
(
    `id`   int(11) NOT NULL AUTO_INCREMENT,
    `role` varchar(10) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`
(
    `id`       int(11) NOT NULL,
    `username` varchar(50)  DEFAULT NULL,
    `gamertag` varchar(50)  DEFAULT NULL,
    `email`    varchar(50)  DEFAULT NULL,
    `region`   varchar(25)  DEFAULT NULL,
    `role`     int(11) DEFAULT NULL,
    `blocked`  varchar(10)  DEFAULT NULL,
    `backdrop` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY        `role` (`role`),
    CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `user_games`;
CREATE TABLE `user_games`
(
    `user` int(11) NOT NULL,
    `game` int(10) unsigned NOT NULL,
    KEY    `user` (`user`),
    KEY    `game` (`game`),
    CONSTRAINT `user_games_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
    CONSTRAINT `user_games_ibfk_2` FOREIGN KEY (`game`) REFERENCES `games` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `user_platforms`;
CREATE TABLE `user_platforms`
(
    `user`     int(11) NOT NULL,
    `platform` int(11) NOT NULL,
    KEY        `user` (`user`),
    KEY        `platform` (`platform`),
    CONSTRAINT `user_platforms_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
    CONSTRAINT `user_platforms_ibfk_2` FOREIGN KEY (`platform`) REFERENCES `platform` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- 2022-09-30 23:40:45
