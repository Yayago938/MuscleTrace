const PEERS = ['https://i.pravatar.cc/60?img=33', 'https://i.pravatar.cc/60?img=34']

export default function StudioPeersCard() {
  return (
    <div className="editorial-card p-5 flex-1">
      <h3 className="text-xs font-bold text-on-surface uppercase tracking-wide mb-4">Studio Peers</h3>
      <div className="flex items-center mb-4">
        {PEERS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Peer"
            className="w-9 h-9 rounded-full object-cover border-2 border-surface-container-lowest -ml-2 first:ml-0"
            style={{ zIndex: PEERS.length - i }}
          />
        ))}
        <span className="-ml-2 w-9 h-9 rounded-full bg-surface-container border-2 border-surface-container-lowest
          flex items-center justify-center text-xs font-bold text-on-surface">
          +12
        </span>
      </div>
      <div className="rounded-full bg-surface-container px-3 py-2 text-xs font-semibold text-on-surface text-center">
        4 Friends Training Now
      </div>
    </div>
  )
}