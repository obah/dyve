export function CourseContent() {
  return (
    <div>
      <h3 className="text-4xl font-light">Course Description</h3>

      <p className="my-6 text-2xl font-light">Duration: 17.5 hours</p>

      <ol className="text-base font-normal">
        <li>Introduction to Blockchain and Cryptocurrency</li>
        <li>Understanding Blockchain Technology</li>

        <ol>
          <li>How Cryptocurrencies Work</li>
          <li>The Role of Blockchain in DeFi</li>
          <li>Benefits and Risks of Using Cryptocurrencies</li>
        </ol>

        <li>What is Decentralized Finance (DeFi)?</li>

        <ol>
          <li>Overview of DeFi</li>
        </ol>
      </ol>
    </div>
  );
}
