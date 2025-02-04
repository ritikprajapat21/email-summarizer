export default function ZodError({ error }: { error: string[] }) {
  if (!error) return null;

  return error.map((e, i) => (
    <div className="text-sm text-red-600 italic" key={i}>
      {e}
    </div>
  ));
}
