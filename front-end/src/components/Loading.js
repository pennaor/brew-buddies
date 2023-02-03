export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-container-content">
        <img src="/logo-brewBuddies.png" alt="homem com uma caneca de cerveja" />
        <div>
          <p>
            Carregando
          </p>
          <div className="dots" />
        </div>
      </div>
    </div>
  );
}
