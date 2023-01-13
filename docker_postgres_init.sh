#!/bin/bash

psql << EOF
CREATE ROLE messengerbot WITH
	LOGIN
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	REPLICATION
	CONNECTION LIMIT -1
	PASSWORD '$POSTGRES_PASSWORD';
EOF