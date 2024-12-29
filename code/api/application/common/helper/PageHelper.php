<?php
/**
 * @author 我只想看看蓝天 
 */

namespace app\common\helper;

class PageHelper
{
    private $db_select;
    private $db_count;
    private $is_page = false;
    private $page = 1;
    private $page_rows;
    private $fetchSql = false;
    private $is_cache = false;
    private $cache_key = 'pageHelper:';
    private $cache_seconds = 60;

    public function __construct($db)
    {
        $this->db_select = $db;
        $this->db_count = clone $db;
        $this->page_rows = config('page_rows') ?: 10;
    }

    public function cache($expires = 60, $prefix = '')
    {
        if (!is_numeric($expires) || $expires < 0) {
            throw new \Exception('缓存时间的值应大于等于0');
        }
        $this->is_cache = true;
        $this->cache_key = $this->cache_key . $prefix;
        $this->cache_seconds = $expires;
        return $this;
    }

    public function alias($alia)
    {
        $this->db_select = $this->db_select->alias($alia);
        $this->db_count = $this->db_count->alias($alia);
        return $this;
    }

    public function where($where, $operation = null, $value = null)
    {
        if (is_string($where)) {
            if (is_null($value)) {
                $this->db_select = $this->db_select->where($where, $operation);
                $this->db_count = $this->db_count->where($where, $operation);
            } else {
                $this->db_select = $this->db_select->where($where, $operation, $value);
                $this->db_count = $this->db_count->where($where, $operation, $value);
            }
        } else {
            $this->db_select = $this->db_select->where($where);
            $this->db_count = $this->db_count->where($where);
        }
        return $this;
    }

    public function whereNotNull($field, $logic = 'AND')
    {
        $this->db_select = $this->db_select->whereNotNull($field, $logic);
        $this->db_count = $this->db_count->whereNotNull($field, $logic);
        return $this;
    }

    public function whereNull($field, $logic = 'AND')
    {
        $this->db_select = $this->db_select->whereNull($field, $logic);
        $this->db_count = $this->db_count->whereNull($field, $logic);
        return $this;
    }

    public function whereIn($field, $condition, $logic = 'AND')
    {
        $this->db_select = $this->db_select->whereIn($field, $condition, $logic);
        $this->db_count = $this->db_count->whereIn($field, $condition, $logic);
        return $this;
    }

    public function whereOr($where, $operation = null, $value = null)
    {
        if (is_string($where)) {
            if (is_null($value)) {
                $this->db_select = $this->db_select->whereOr($where, $operation);
                $this->db_count = $this->db_count->whereOr($where, $operation);
            } else {
                $this->db_select = $this->db_select->whereOr($where, $operation, $value);
                $this->db_count = $this->db_count->whereOr($where, $operation, $value);
            }
        } else {
            $this->db_select = $this->db_select->whereOr($where);
            $this->db_count = $this->db_count->whereOr($where);
        }
        return $this;
    }

    public function whereTime($field, $op, $range = null, $logic = null)
    {
        if (!is_null($range)) {
            $this->db_select = $this->db_select->whereTime($field, $op, $range);
            $this->db_count = $this->db_count->whereTime($field, $op, $range);
        } elseif (!is_null($logic)) {
            $this->db_select = $this->db_select->whereTime($field, $op, $range, $logic);
            $this->db_count = $this->db_count->whereTime($field, $op, $range, $logic);
        } else {
            $this->db_select = $this->db_select->whereTime($field, $op);
            $this->db_count = $this->db_count->whereTime($field, $op);
        }
        return $this;
    }

    public function whereBetween($field, $condition, $logic = null)
    {
        if (!is_null($logic)) {
            $this->db_select = $this->db_select->whereBetween($field, $condition, $logic);
            $this->db_count = $this->db_count->whereBetween($field, $condition, $logic);
        } else {
            $this->db_select = $this->db_select->whereBetween($field, $condition);
            $this->db_count = $this->db_count->whereBetween($field, $condition);
        }
        return $this;
    }

    public function join($table, $condition = null, $type = 'INNER')
    {
        if (is_null($condition)) {
            $this->db_select = $this->db_select->join($table);
            $this->db_count = $this->db_count->join($table);
        } else {
            $this->db_select = $this->db_select->join($table, $condition, $type);
            $this->db_count = $this->db_count->join($table, $condition, $type);
        }
        return $this;
    }

    public function group($group)
    {
        $this->db_select = $this->db_select->group($group);
        $this->db_count = $this->db_count->group($group);
        return $this;
    }

    public function having($having)
    {
        $this->db_select = $this->db_select->having($having);
        $this->db_count = $this->db_count->having($having);
        return $this;
    }

    public function field($field)
    {
        $this->db_select = $this->db_select->field($field);
        return $this;
    }

    public function fetchSql($is_fetch)
    {
        if ($is_fetch) {
            $this->fetchSql = true;
        }
        return $this;
    }

    public function order($field, $order = "ASC")
    {
        if (is_string($field)) {
            $this->db_select = $this->db_select->order($field, $order);
        } else {
            $this->db_select = $this->db_select->order($field);
        }
        return $this;
    }

    public function page($page, $page_rows)
    {
        $this->is_page = true;
        $this->page = $page;
        $this->page_rows = $page_rows;
        $this->db_select = $this->db_select->page($page, $page_rows);
        return $this;
    }

    public function autoPage($page = 'page', $page_rows = 'page_rows')
    {
        if ($page !== false) {
            $this->is_page = true;
            if (!is_string($page) || !is_string($page_rows)) { //防止$page=true
                $page = 'page';
                $page_rows = 'page_rows';
            }
            if (request()->$page && is_numeric(request()->$page)) {
                $this->page = request()->$page;
            }
            if (request()->$page_rows && is_numeric(request()->$page_rows)) {
                $this->page_rows = request()->$page_rows;
            }
            $this->db_select = $this->db_select->page($this->page, $this->page_rows);
        }
        return $this;
    }

    public function get()
    {
        if ($this->fetchSql) {
            return [$this->db_select->fetchSql(true)->select(), $this->db_count->fetchSql(true)->count()];
        }
        //做缓存
        if ($this->is_cache) {
            $db_select = clone $this->db_select;
            $db_count = clone  $this->db_count;
            $list_sql = $db_select->fetchSql(true)->select();
            $count_Sql = $db_count->fetchSql(true)->count();
            $res['list'] = $this->db_select->cache($this->cache_key . md5($list_sql), $this->cache_seconds)->select();
            $res['total'] = $this->db_count->cache($this->cache_key . md5($count_Sql), $this->cache_seconds)->count();
        } else {
            $res['list'] = $this->db_select->select();
            $res['total'] = $this->db_count->count();
        }
        if ($this->is_page) {
            $res['page'] = (int)$this->page;
            $res['page_rows'] = (int)$this->page_rows;
        }
        return $res;
    }
}
