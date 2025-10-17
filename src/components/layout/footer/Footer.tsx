export function Footer() {
  return (
    <footer className="bg-card border-t py-2 px-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} SPSU Admin Portal. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <p> Developed by Lakshya Chopra, Puneet Dhankar, Riya, Aftab Khan, Ashwani Sharma & Suhani Bafna</p>
        </div>
      </div>
    </footer>
  );
}
