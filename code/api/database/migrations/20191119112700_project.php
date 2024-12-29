<?php

use think\migration\Migrator;
use think\migration\db\Column;

class Project extends Migrator
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
        $table = $this->table('project', array('engine' => 'InnoDB', 'comment' => '项目表'));
        $table->addColumn('uid', 'integer', ['default' => 0, 'comment' => '所属用户', 'null' => false])
            ->addColumn('title', 'string', ['limit' => 255, 'default' => '', 'comment' => '项目名称', 'null' => false])
            ->addColumn('desc', 'string', ['limit' => 1024, 'default' => '', 'comment' => '项目描述', 'null' => false])
            ->addColumn('fixed_link', 'string', ['limit' => 1024, 'default' => '', 'comment' => '项目访问固定链接', 'null' => false])
            ->addColumn('auth_code', 'string', ['limit' => 50, 'default' => '', 'comment' => '授权码', 'null' => false])
            ->addColumn('create_time', 'integer', ['default' => 0, 'comment' => '创建时间', 'null' => false])
            ->addColumn('update_time', 'integer', ['default' => 0, 'comment' => '更新时间', 'null' => false])
            ->create();
    }
}
