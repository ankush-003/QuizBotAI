import MessageList from '@/components/MessageList'

export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MessageList />
    </main>
  )
}