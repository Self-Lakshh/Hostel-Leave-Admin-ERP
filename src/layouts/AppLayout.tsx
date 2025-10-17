import React from 'react';
import { BaseLayout } from './BaseLayout';
import { Header } from '../components/layout/header/Header';
import { Sidebar } from '../components/layout/sidebar/Sidebar';
import { Footer } from '../components/layout/footer/Footer';

export const AppLayout: React.FC = () => {
    // Sidebar state and toggle can live here and be passed down
    const [isOpen, setIsOpen] = React.useState(true);
    return (
        <BaseLayout
            sidebar={<Sidebar isOpen={isOpen} onToggle={() => setIsOpen((s) => !s)} />}
            header={<Header onMenuClick={() => setIsOpen((s) => !s)} isOpen={isOpen} />}
            footer={<Footer />}
        />
    );
};

export default AppLayout;
