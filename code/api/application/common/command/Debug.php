<?php

namespace app\common\command;

use think\console\Command;
use think\console\Input;
use think\console\Output;

class Debug extends Command
{
    protected function configure()
    {
        // 指令配置
        $this->setName('debug')->setDescription('调试专用');

    }

    protected function execute(Input $input, Output $output)
    {
        //
    }
}
