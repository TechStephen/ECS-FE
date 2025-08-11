export async function GET() {
    console.log('Test API route called!');
    return Response.json({ 
        message: 'Test API route works!', 
        timestamp: new Date().toISOString() 
    });
}