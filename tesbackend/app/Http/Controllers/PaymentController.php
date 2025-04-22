<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Services\SupabaseService;

class PaymentController extends Controller
{
    protected $supabase;
    
    public function __construct(SupabaseService $supabase)
    {
        $this->supabase = $supabase;
    }
    
    public function uploadProof(Request $request, $id)
    {
        $request->validate([
            'proof' => 'required|image|max:2048',
        ]);
        
        $booking = Booking::where('user_id', auth()->id())
            ->findOrFail($id);
            
        $path = 'payments/' . auth()->id() . '/' . time() . '.' . 
               $request->file('proof')->extension();
        
        $this->supabase->uploadFile(
            'payment-proofs',
            $path,
            file_get_contents($request->file('proof')->getRealPath())
        );
        
        $url = $this->supabase->getPublicUrl('payment-proofs', $path);
        
        $booking->update([
            'payment_proof' => $url,
            'status' => 'confirmed'
        ]);
        
        return response()->json(['url' => $url]);
    }
}