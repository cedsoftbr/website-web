import { MessageCircle } from 'lucide-react'
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
          Tecnologia que impulsiona
          <br />
          <span className="text-gradient">o seu negócio.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          A <span className="font-medium text-foreground">CEDSoft Soluções</span> está desenvolvendo 
          soluções modernas em software, focadas em inteligência e eficiência operacional. 
          Estamos expandindo nossa stack de inovações:
        </p>

        {/* Stack Highlights */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-sm sm:text-base">
          <span className="text-brand/80">#Declaradata</span>
          <span className="text-brand/80">#Integradata</span>
          <span className="text-brand/80">#Pontodata</span>
          <span className="text-brand/80">#Rastreiadata</span>
        </div>

        <p className="mt-10 max-w-xl text-base text-muted-foreground">
          Prepare-se para o lançamento da nossa nova plataforma. 
          <br />
          Quer conhecer esses módulos em primeira mão?
        </p>

        <div className="mt-10">
          <Button
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="group h-14 bg-brand hover:bg-brand/90 px-10 text-lg font-semibold text-brand-foreground shadow-glow transition-all hover:shadow-[0_0_40px_hsl(var(--brand)/0.4)]"
          >
            <MessageCircle className="mr-2 h-6 w-6 transition-transform group-hover:rotate-12" />
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
