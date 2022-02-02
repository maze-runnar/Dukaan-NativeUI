function Sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms)); // sleep function to later use loading screen
}

export default Sleep;
