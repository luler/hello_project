<?php

use think\migration\Migrator;

class ProjectAddField extends Migrator
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $this->table('project')
            ->addColumn('code', 'string', ['limit' => 50, 'default' => '', 'comment' => '项目唯一标识符（可变）', 'null' => false])
            ->addIndex(['code'], ['unique' => true])
            ->update();
    }
}
