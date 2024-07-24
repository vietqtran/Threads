'use client'

import { useHomeStore } from '@/providers/StoresProvider'
import Section from './Section'

const HomePage = () => {
    const { sections } = useHomeStore(state => state)
    return (
        <main
            className={`flex size-full gap-3 ${sections.length === 0 ? 'justify-center' : ''} ${sections.length === 1 ? 'justify-start lg:justify-center mr-10' : ''} ${sections.length === 2 ? 'justify-start' : ''} `}
        >
            <div className="min-w-[76px]"></div>
            <Section isMainSection={true} />
            {sections.map(section => {
                return <Section key={section.id} isMainSection={false} title={section.title} section={section} />
            })}
            <div className="min-w-[76px]"></div>
        </main>
    )
}

export default HomePage
