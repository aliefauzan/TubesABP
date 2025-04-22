<?php
namespace App\Services;

use Supabase\Postgrest\PostgrestClient;
use Supabase\Storage\StorageClient;

class SupabaseService
{
    protected $postgrest;
    protected $storage;
    
    public function __construct()
    {
        $this->postgrest = app('supabase.postgrest');
        $this->storage = app('supabase.storage');
    }
    
    public function subscribeToRealtime($table, $event, $callback)
    {
        return $this->postgrest
            ->from($table)
            ->on($event, $callback)
            ->subscribe();
    }
    
    public function uploadFile($bucket, $path, $file)
    {
        return $this->storage
            ->from($bucket)
            ->upload($path, $file);
    }
    
    public function getPublicUrl($bucket, $path)
    {
        return $this->storage
            ->from($bucket)
            ->getPublicUrl($path);
    }
}