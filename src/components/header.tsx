const Header: any = () => {
    return (
        <header className="bg-black text-white px-0 py-2 max-w-screen-xl">
            <div className="fixed justify-between items-center max-w-screen-xl mx-auto">
                {/* Logo */}
                <a href="#" className="fixed top-2 left-8 text-3xl font-bold flex-shrink-0">StudySpace</a>
                
                {/* Navigation Links */}
                <nav>
                    <ul className="flex justify-between space-x-5">
                        <li><a href="#" className="fixed top-4 right-20 text-white">Sign up</a></li>
                        <li><a href="#" className="fixed top-4 right-6 text-white">Log in</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
