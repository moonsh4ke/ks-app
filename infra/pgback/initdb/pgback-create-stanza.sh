#!/bin/bash

pgbackrest --stanza=main --log-level-console=info stanza-create
pgbackrest --stanza=main --log-level-console=info check
