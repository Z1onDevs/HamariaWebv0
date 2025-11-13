// =============================================
// Email Queue with Rate Limiting
// =============================================
// Ensures we don't exceed Resend's 2 emails/second limit

type EmailJob = {
  id: string
  send: () => Promise<any>
  resolve: (value: any) => void
  reject: (error: any) => void
}

class EmailQueue {
  private queue: EmailJob[] = []
  private processing = false
  private lastSendTime = 0
  private readonly minDelayMs = 550 // 550ms between emails = ~1.8 emails/sec (safe buffer)

  async add<T>(sendFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const job: EmailJob = {
        id: Math.random().toString(36).substring(7),
        send: sendFn,
        resolve,
        reject
      }
      
      this.queue.push(job)
      console.log(`[Email Queue] Added job ${job.id}. Queue size: ${this.queue.length}`)
      
      if (!this.processing) {
        this.processQueue()
      }
    })
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) {
      return
    }

    this.processing = true
    console.log(`[Email Queue] Starting to process ${this.queue.length} job(s)`)

    while (this.queue.length > 0) {
      const job = this.queue.shift()
      if (!job) break

      try {
        // Ensure minimum delay between sends
        const now = Date.now()
        const timeSinceLastSend = now - this.lastSendTime
        
        if (timeSinceLastSend < this.minDelayMs && this.lastSendTime > 0) {
          const delayNeeded = this.minDelayMs - timeSinceLastSend
          console.log(`[Email Queue] Rate limit delay: ${delayNeeded}ms before job ${job.id}`)
          await new Promise(resolve => setTimeout(resolve, delayNeeded))
        }

        console.log(`[Email Queue] Processing job ${job.id}`)
        const result = await job.send()
        this.lastSendTime = Date.now()
        
        job.resolve(result)
        console.log(`[Email Queue] ✓ Job ${job.id} completed`)
      } catch (error) {
        console.error(`[Email Queue] ✗ Job ${job.id} failed:`, error)
        job.reject(error)
      }
    }

    this.processing = false
    console.log('[Email Queue] Queue empty, processing stopped')
  }

  getQueueSize(): number {
    return this.queue.length
  }

  isProcessing(): boolean {
    return this.processing
  }
}

// Singleton instance
export const emailQueue = new EmailQueue()

