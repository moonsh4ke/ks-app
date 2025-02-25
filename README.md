# Setting up the environment

Before running docker-compose in a production environment:

- Make sure to attach/mount a persistent device/partition/volume to the host
  machine -- a service like AWS EBS would make the work --, and add the path
  to the `DB_DATA_DIR` environment variable.

- Set the `POSTGRES_*` environment variables.

- Set the `APP_HOST` to match the DNS of the host machine -- Make sure that
  this DNS isn't dynamic (you can use a service like AWS Elastic IP). Also set
  the `APP_PORT` variable.

- Set the `APP_IMG` to match the endpoint to fetch the app image.

- If you aren't going to backup the database to s3 make sure to uncomment the
  lines that set a basic postgres service -- under `postgres-ks-app` service.
  **Otherwise**: follow the next steps.

- Build the extended postgres image to make periodical backups via pgbackrest:
  `docker build -t pgplusbackup ./infra/pgplusbackup`

- Connect pgbackrest to s3: Make sure to create an IAM role; and an access key
  with a secret associated to this role. Then, add a policy in the s3 to allow
  access and set all the `repo1-s3-*` values in
  `infra/pgplusbackup/pgbackrest.conf` (use
  `infra/pgplusbackup/pgbackrest.example.conf` as base). The policy would
  something similar to [^1]:

        ```json
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:ListBucket"
                    ],
                    "Resource": [
                        "arn:aws:s3:::demo-bucket"
                    ],
                    "Condition": {
                        "StringEquals": {
                            "s3:prefix": [
                                "",
                                "demo-repo"
                            ],
                            "s3:delimiter": [
                                "/"
                            ]
                        }
                    }
                },
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:ListBucket"
                    ],
                    "Resource": [
                        "arn:aws:s3:::demo-bucket"
                    ],
                    "Condition": {
                        "StringLike": {
                            "s3:prefix": [
                                "demo-repo/*"
                            ]
                        }
                    }
                },
                {
                    "Effect": "Allow",
                    "Action": [
                        "s3:PutObject",
                        "s3:PutObjectTagging",
                        "s3:GetObject",
                        "s3:GetObjectVersion",
                        "s3:DeleteObject"
                    ],
                    "Resource": [
                        "arn:aws:s3:::demo-bucket/demo-repo/*"
                    ]
                }
            ]
        }
        ```

- (optional) Tweak the postgresql configuration if needed at:
  `infra/pgplusbackup/my-postgres.conf`.

# Local testing

For local testing; use a docker container running postgresql:

    docker run --name some-postgres -p 5440:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres

Then, add the database URI to `.env.local.test`; for the previous example it would be:

    DATABASE_URL ='postgresql://postgres:mysecretpassword@localhost:5440'

Run the npm test script:

    npm run test

# Known issues

If the pgplusbackup image is used instead of the postgres one, then make sure
that the environment variables `POSTGRES_USER` and `POSTGRES_DB` are equal to
`postgres` otherwise you are going to get unexpected behavior.

[^1]: You would need to add a few lines to add the IAM role ARN to this policy.
