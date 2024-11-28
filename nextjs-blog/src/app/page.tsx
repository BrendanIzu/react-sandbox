import Recorder from "./components/SimpleRecordButton";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-white">
      <Recorder />
    </div>
  );
}
// left side: loudness: 1 - 100 (loudness of mic, 0 default)
// right side, loudness overtime, last 200 seconds
interface HelloWorldProps {}

function HelloWorld({}: HelloWorldProps) {
  return <div className="text-sm font-semibold text-black">hello world</div>;
}
