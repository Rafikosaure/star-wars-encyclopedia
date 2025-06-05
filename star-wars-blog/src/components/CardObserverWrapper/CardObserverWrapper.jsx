import { useInView } from 'react-intersection-observer';
import Card from '../Card/Card';


export default function CardObserverWrapper({ item, categoryId }) {
  const { ref, inView } = useInView({
    threshold: 1.0, // 100% visible
    triggerOnce: true, // Ne recharge pas une fois visible
  });

  return (
    <div ref={ref}>
      {inView && <Card item={item} categoryId={categoryId} />}
    </div>
  );
}
