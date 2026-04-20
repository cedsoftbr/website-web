import { Button } from '@/components/ui/button'

const Index = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5500000000000'
  const whatsappMessage = encodeURIComponent('Olá! Gostaria de saber mais sobre as soluções da CEDSoft, especialmente sobre os módulos Data.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <main className="relative min-h-screen overflow-hidden bg-background bg-hero">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          CEDSoft <span className="text-muted-foreground font-normal">Soluções</span>
        </span>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-4xl flex-col items-center justify-center px-6 pb-20 text-center">
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Algo novo está sendo
          <br />
          <span className="text-gradient">construído.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          A <span className="font-medium text-foreground">CEDSoft Soluções</span> está desenvolvendo 
          soluções modernas em software, focadas em inteligência e eficiência operacional. 
          Estamos expandindo nossa stack de inovações:
        </p>

        {/* Stack Highlights */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-sm sm:text-base">
          <span className="text-brand/80 font-medium">#Declaradata</span>
          <span className="text-brand/80 font-medium">#Integradata</span>
          <span className="text-brand/80 font-medium">#Pontodata</span>
          <span className="text-brand/80 font-medium">#Rastreiadata</span>
        </div>

        <p className="mt-10 max-w-xl text-base text-muted-foreground">
          Prepare-se para uma nova experiência tecnológica.
          <br />
          Quer conhecer esses módulos em primeira mão?
        </p>

        <div className="mt-10">
          <Button
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="h-14 bg-white hover:bg-white/90 px-12 text-lg font-bold text-black shadow-glow transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Saiba Mais
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-6 font-mono text-xs text-muted-foreground/70">
        <span>© {new Date().getFullYear()} CEDSoft Soluções</span>
      </footer>
    </main>
  )
}

export default Index
