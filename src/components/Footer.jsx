function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-gray-400">
        <p>
          © {new Date().getFullYear()} All rights reserved
        </p>

        <p className="mt-1">
          Project Owner:{" "}
          <span className="text-gray-200 font-medium">
            Siddharth Bellundagi
          </span>{" "}
          ·{" "}
          <a
            href="https://www.linkedin.com/in/siddharth-bellundagi/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-500 transition"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
