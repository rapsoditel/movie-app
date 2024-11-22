interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {

  return (
    <header data-testid="header" className="bg-slate-900 p-4 sticky top-0 z-10">
     <h1 className="text-white text-2xl font-bold text-center">MovieApp</h1>
    </header>
  );
};

export default Header;
