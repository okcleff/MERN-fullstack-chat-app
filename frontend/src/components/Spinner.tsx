// currentColor를 따르는 미니멀 스피너. 부모의 text 색을 그대로 사용한다.
const Spinner = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <span
    className={`inline-block rounded-full border-2 border-current border-t-transparent animate-spin ${className}`}
  />
);

export default Spinner;
