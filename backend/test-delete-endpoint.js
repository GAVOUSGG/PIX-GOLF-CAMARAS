// ESM version
async function testDelete() {
  try {
    console.log('Testing DELETE http://localhost:3001/camera-history...');
    const response = await fetch('http://localhost:3001/camera-history', {
      method: 'DELETE'
    });
    
    console.log('Status:', response.status);
    if (response.ok) {
        console.log('Success:', await response.json());
    } else {
        console.log('Error Text:', await response.text());
    }
  } catch (error) {
    console.error('Connection failed:', error.message);
  }
}

testDelete();
