const templates = ["General", "Lab", "Follow-up"];

export default function Step4({ state, update }: any) {
  return (
    <div>
      <h2 className="mb-4 font-semibold">Templates</h2>

      <div className="flex gap-3 mb-4">
        {templates.map((t) => (
          <button
            key={t}
            onClick={() =>
              update({ template: t, notes: `Template: ${t}` })
            }
            className="border p-3 rounded"
          >
            {t}
          </button>
        ))}
      </div>

      <textarea
        className="w-full border p-4"
        rows={5}
        value={state.notes}
        onChange={(e) => update({ notes: e.target.value })}
      />

      <button
        onClick={() => update({ step: 5 })}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
      >
        Next
      </button>
    </div>
  );
}