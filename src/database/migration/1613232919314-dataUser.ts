import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class dataUser1613232919314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'profile',

            columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              generationStrategy: 'increment',
              isNullable: false
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false
            },
            {
              name: 'bio',
              type: 'varchar',
            },
            {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()'
            }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('profile');
    }

}
