export class RateLimiter {
  constructor(maxRequests = 3, timeWindow = 60000) { // 3 requests per minute by default
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }

  async tryRequest() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.timeWindow - (now - oldestRequest);
      throw new Error(`Please wait ${Math.ceil(waitTime / 1000)} seconds before trying again.`);
    }

    this.requests.push(now);
    return true;
  }
}