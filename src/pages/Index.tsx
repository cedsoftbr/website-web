# WhatsApp Configuration
VITE_WHATSAPP_NUMBER=5541999999999

# (Brevo and Cloudflare variables removed as they are no longer used)
pNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5500000000000'
  const whatsappMessage = encodeURIComponent('Olá! Vim pelo site da CEDSoft Soluções e gostaria de mais informações.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <main className="relative min-h-screen overflow-hidden bg-background bg-hero">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          CEDSoft <span className="text-muted-foreground font-normal">Soluções</span>
        </span>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-3xl flex-col items-center justify-center px-6 pb-20 text-center">
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Algo novo está sendo
          <br />
          <span className="text-gradient">construído.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          A <span className="font-medium text-foreground">CEDSoft Soluções</span> está
          desenvolvendo soluções modernas em software. 
          <br />
          Precisa de uma solução agora? Entre em contato diretamente conosco.
        </p>

        <div className="mt-10">
          <Button
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="group h-12 bg-[#25D366] hover:bg-[#20ba5a] px-8 font-medium text-white shadow-glow transition-all hover:shadow-[0_0_80px_rgba(37,211,102,0.4)]"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Falar no WhatsApp
          </Button>
        </div>

        <p className="mt-6 font-mono text-xs text-muted-foreground/70">
          Atendimento ágil e personalizado.
        </p>
      </section>

      <footer className="absolute bottom-0 left-0 right-0 z-10 mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-6 font-mono text-xs text-muted-foreground/70">
        <span>© {new Date().getFullYear()} CEDSoft Soluções</span>
      </footer>
    </main>
  )
}

export default Index
