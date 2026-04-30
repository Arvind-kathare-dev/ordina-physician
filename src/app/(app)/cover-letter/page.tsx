import CoverLetterDocument from "../../../components/common/CoverLetterDocument";


export default function CoverLetterPage() {
  return (
    <div className="w-full h-full overflow-y-auto print:h-auto print:overflow-visible print:bg-white">
      <CoverLetterDocument />
    </div>
  );
}
