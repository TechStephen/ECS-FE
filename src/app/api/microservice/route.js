export async function GET() {
  try {
      console.log('API route called - fetching from microservice...');
      
      const response = await fetch('http://ms-alias.services.local:80', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      
      console.log('Microservice response status:', response.status);
      
      if (!response.ok) {
          throw new Error(`Microservice responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Microservice data:', data);
      
      return Response.json(data);
  } catch (error) {
      console.error('Error in API route:', error);
      return Response.json(
          { error: 'MS call failed', message: error.message }, 
          { status: 500 }
      );
  }
}