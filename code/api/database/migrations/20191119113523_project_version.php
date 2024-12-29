<?php

use think\migration\Migrator;
use think\migration\db\Column;

class ProjectVersion extends Migrator
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
        $table = $this->table('project_version', array('engine' => 'InnoDB', 'comment' => '项目版本表'));
        $table->addColumn('url', 'string', ['limit' => 255, 'default' => '', 'comment' => '访问地址', 'null' => false])
            ->addColumn('zip_file_url', 'string', ['limit' => 255, 'default' => '', 'comment' => '上传的压缩文件', 'null' => false])
            ->addColumn('file_name', 'string', ['limit' => 255, 'default' => '', 'comment' => '文件名称', 'null' => false])
            ->addColumn('uid', 'integer', ['default' => 0, 'comment' => '所属用户', 'null' => false])
            ->addColumn('project_id', 'integer', ['default' => 0, 'comment' => '所属项目id', 'null' => false])
            ->addColumn('path', 'string', ['limit' => 255, 'default' => '', 'comment' => '文件路径', 'null' => false])
            ->addColumn('create_time', 'integer', ['default' => 0, 'comment' => '创建时间', 'null' => false])
            ->addColumn('update_time', 'integer', ['default' => 0, 'comment' => '更新时间', 'null' => false])
            ->create();
    }
}
