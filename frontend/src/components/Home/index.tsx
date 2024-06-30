import Section from './Section'

const HomePage = () => {
  const sectionLength: number = 3
  return (
    <main
      className={`flex size-full gap-3 ${sectionLength === 1 ? 'justify-center' : ''} ${sectionLength === 2 ? 'justify-start lg:justify-center mr-10' : ''} ${sectionLength === 3 ? 'justify-start' : ''} `}
    >
      <div className="min-w-[76px]"></div>
      <Section isMainSection />
      <Section title="kjdfhkadfk" />
      <Section title="kjdfhkadfk" />
      <Section title="kjdfhkadfk" />
      <div className="min-w-[76px]"></div>
    </main>
  )
}

export default HomePage
